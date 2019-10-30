namespace MyIntegration {

    public sealed class CompanyIntegration: TextIntegration<Company> {
    
        protected CompanyIntegration("customers.ini") {
            _fileName = fileName;
        }
    
        protected override Company ConvertLine(string line) {
            var data = line.Split(";");
            return new Company() {
                Id = data[@index],
                Name = data[@index],
                Code = data[@index],
                Address = data[@index],
            };
        }
    }
}
