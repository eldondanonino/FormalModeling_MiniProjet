import { output, parse, process } from "./parser";
import { updateFileSelect, getFilesInDirectory } from "./getFiles";

updateFileSelect();
getFilesInDirectory();

output();
