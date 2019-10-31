const os = require('os')
const fs = require("fs")
const handlebars = require('handlebars');

const template =
    `namespace MyIntegration {

    public sealed class {{type}}Integration: TextIntegration<{{type}}> {
    
        public {{type}}Integration(): base("{{fileName}}") {
        }
    
        protected override {{type}} ConvertLine(string line) {
            var data = line.Split("{{separator}}");
            return new {{type}}() {
            {{#each props}}
                {{this}} = data[{{@index}}],
            {{/each}}
            };
        }
    }
}
`

const metadata = fs.readFileSync("metadata.txt").toString().trim()
const lines = metadata.split(os.EOL)
const integrations = lines.map(l => {
    const d = l.split("-")
    return {
        fileName: d[0],
        type: d[1],
        props: d[2].split(","),
        separator: d[3]
    }
})

if (!fs.existsSync("out")) {
    fs.mkdirSync("out")
}

const compiledTemplate = handlebars.compile(template)
integrations.forEach(i => {
    const result = compiledTemplate(i)
    fs.writeFileSync(`out/${i.type}.cs`, result)
})
