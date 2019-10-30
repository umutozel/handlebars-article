namespace MyIntegration {

    public sealed class UserIntegration: TextIntegration<User> {
    
        protected UserIntegration("people.txt") {
            _fileName = fileName;
        }
    
        protected override User ConvertLine(string line) {
            var data = line.Split(",");
            return new User() {
                Username = data[@index],
                FirstName = data[@index],
                LastName = data[@index],
            };
        }
    }
}
