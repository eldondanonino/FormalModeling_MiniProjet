import { output, parse, process } from "./parser";
const { readdirSync } = require("fs");

const testFiles_folderPath = "./documents/test_files/";

export function updateFileSelect() {
  console.log("updateFileSelect reached");
  let selectFile = document.getElementById("selectFile");

  selectFile.onchange = function () {
    let prompt = "";

    if (selectFile.value == "") {
      prompt = "Please select a file";
    } else {
      prompt = "You have selected " + selectFile.value;
    }

    document.getElementById("selectOutput").innerHTML = "<p>" + prompt + "</p>";

    /// Launch the app
    // TODO: check the file is not null
    output(testFiles_folderPath + selectFile.value + ".txt");
  };
}

export function getFilesPath(filePath) {
  /// Get the files in the given folder
  filePath = testFiles_folderPath;

  /// Get existing files in directory
  //let files = getFilesInDirectory(filePath);

  /// Insert  selection in HTML
  // Done by 'updateFileSelect()'
}

export function getFilesInDirectory(path) {
  // Could not implement dynamic names
  //cf: 'fs.readdirSync()'

  /* let files = readdirSync("documents/test_files/");

  console.log(files); */
}
