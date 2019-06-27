const fs = require("fs");
const schemaFile = fs.readFileSync("apollo/client-configs/schema.json");
const schema = JSON.parse(schemaFile);
const filteredData = schema.__schema.types.filter(
  type => type.possibleTypes !== null
);
schema.__schema.types = filteredData;
fs.writeFileSync(
  "apollo/client-configs/fragments.json",
  JSON.stringify(schema),
  err => {
    if (err) console.error("Error writing fragmentTypes file", err);
    console.log("Fragment types successfully extracted.");
  }
);
