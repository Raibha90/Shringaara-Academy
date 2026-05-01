import fs from 'fs';
const content = fs.readFileSync('src/App.tsx', 'utf-8');
const startIdx = content.indexOf('{/* 1. Hero Banner */}');
const endIdx = content.indexOf('{/* Footer */}');
if (startIdx > -1 && endIdx > -1) {
  const newContent = content.substring(0, startIdx) + '<main id="main-content" className="flex-1">\n        {renderContent()}\n      </main>\n\n      ' + content.substring(endIdx);
  fs.writeFileSync('src/App.tsx', newContent);
  console.log("Patched successfully");
} else {
  console.log("Could not find delimiters");
}
