import { output, parse, process } from "./parser";

const testFiles_folderPath = "./documents/test_files/";

export function updateFileSelect() {
  let selectFile = document.getElementById("selectFile");

  selectFile.onchange = function () {
    document.getElementById("selectOutput").innerHTML = Date.now();

    output(process(parse()));
  };
}

export function getFilesPath(filePath) {
  /// Get the files in the given folder
  filePath = testFiles_folderPath;

  /// Get existing files in directory
  let files = getFilesInDirectory(filePath);

  /// Insert  selection in HTML
}

export function getFilesInDirectory(path) {
  let fs = require("fs");
  let files = fs.readdirSync("documents/test_files/");

  console.log(files);
}
