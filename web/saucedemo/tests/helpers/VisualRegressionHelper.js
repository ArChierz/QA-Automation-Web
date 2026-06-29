import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pixelmatch from 'pixelmatch'; // NEW IMPORT
import { PNG } from 'pngjs';         // NEW IMPORT

class VisualRegressionHelper {
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    this.baselineDir = path.join(__dirname, '..','..', 'screenshot', 'visual-baseline');
    this.currentDir = path.join(__dirname, '..','..', 'screenshot', 'visual-current');
    this.diffDir = path.join(__dirname, '..','..', 'screenshot', 'visual-diff');
    this._ensureDirs();
  }

  _ensureDirs() {
    [this.baselineDir, this.currentDir, this.diffDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  getBaselinePath(filename) { return path.join(this.baselineDir, filename); }
  getCurrentPath(filename) { return path.join(this.currentDir, filename); }
  getDiffPath(filename) { return path.join(this.diffDir, filename); }

  hasBaseline(filename) { return fs.existsSync(this.getBaselinePath(filename)); }

  saveAsBaseline(currentFilename, baselineFilename = currentFilename) {
    const currentPath = this.getCurrentPath(currentFilename);
    const baselinePath = this.getBaselinePath(baselineFilename);

    if (fs.existsSync(currentPath)) {
      fs.copyFileSync(currentPath, baselinePath);
      console.log(`Baseline saved: ${baselinePath}`);
    }
  }

  compareImages(filename) {
    const baselinePath = this.getBaselinePath(filename);
    const currentPath = this.getCurrentPath(filename);
    const diffPath = this.getDiffPath(filename);

    if (!fs.existsSync(baselinePath)) {
      return { hasBaseline: false, match: null, matchPercentage: 0, message: `No baseline found` };
    }
    if (!fs.existsSync(currentPath)) {
      return { hasBaseline: true, match: false, matchPercentage: 0, message: `Current screenshot not found` };
    }

    // --- PIXELMATCH CONFIGURATION ---
    
    // 1. Decode the PNG files into raw data
    const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
    const img2 = PNG.sync.read(fs.readFileSync(currentPath));

    const { width, height } = img1;
    
    // 2. Create an empty image buffer to hold the red diff highlights
    const diff = new PNG({ width, height });

    // 3. Run pixelmatch
    // It returns the exact integer of mismatched pixels
    const numDiffPixels = pixelmatch(
      img1.data, 
      img2.data, 
      diff.data, 
      width, 
      height, 
      { threshold: 0.1 } // 0.1 is the industry standard tolerance for anti-aliasing
    );

    // 4. Calculate the real percentage
    const totalPixels = width * height;
    const mismatchPercentage = (numDiffPixels / totalPixels) * 100;
    const matchPercentage = 100 - mismatchPercentage;

    // 5. If differences exist, save the diff image so you can look at it
    if (numDiffPixels > 0) {
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
    }

    return {
      hasBaseline: true,
      match: matchPercentage >= 95, // Using your 95% threshold rule
      matchPercentage: parseFloat(matchPercentage.toFixed(2)),
      message: `Images differ by ${mismatchPercentage.toFixed(2)}%`,
      diffPath: numDiffPixels > 0 ? diffPath : null
    };
  }

  clearCurrentVisual(){
    if(fs.existsSync(this.currentDir)){
        const files = fs.readdirSync(this.currentDir);

        for(const file of files){
            fs.unlinkSync(path.join(this.currentDir, file));
        }

        console.log("Cleaned upp old files in visual-current folder");
        
    }
  }
}

export default VisualRegressionHelper;