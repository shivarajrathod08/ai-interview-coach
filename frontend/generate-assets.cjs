const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");

const assetsDir = path.join(__dirname, "src", "assets");

function toName(file) {
    return file
        .replace(".svg", "")
        .split(/[\/\\-]/)
        .map(x => x.charAt(0).toUpperCase() + x.slice(1))
        .join("");
}

const folders = [
    "animations",
    "avatars",
    "backgrounds",
    "icons",
    "illustrations",
    "images",
    "logos"
];

let imports = [];
let exportsList = [];

folders.forEach(folder => {

    const files = fg.sync(`${folder}/*.svg`, {
        cwd: assetsDir
    });

    imports.push(`// ${folder}`);

    files.sort().forEach(file => {

        const name = toName(folder) + toName(path.basename(file));

        imports.push(
            `import ${name} from "./${file.replace(/\\/g,"/")}";`
        );

        exportsList.push(name);

    });

    imports.push("");
});

const output =
`${imports.join("\n")}

export {

${exportsList.map(e=>"    "+e).join(",\n")}

};

export default {

${exportsList.map(e=>"    "+e).join(",\n")}

};
`;

fs.writeFileSync(
    path.join(assetsDir,"index.js"),
    output
);

console.log("Done!");