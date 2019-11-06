const collapsedFiles = Array.from(document.querySelectorAll('a.click-to-expand.js-click-to-expand'));
collapsedFiles.forEach(i => i.click());
console.log(`Expanded ${collapsedFiles.length} files.`);