# Clear existing data (optional, useful during development)
User.destroy_all

# Seed data
users = [
  {
    email: "john.doe@example.com",
    password: "password123",
    name: "John Doe",
    username: "johndoe"
  },
  {
    email: "jane.doe@example.com",
    password: "password123",
    name: "Jane Doe",
    username: "janedoe"
  },
  {
    email: "admin@example.com",
    password: "adminpassword",
    name: "Admin User",
    username: "admin"
  }
]

# Create users
users.each do |user_data|
  User.create!(
    email: user_data[:email],
    password: user_data[:password], # Rails automatically hashes passwords using bcrypt
    name: user_data[:name],
    username: user_data[:username]
  )
end

puts "Seeded #{User.count} users successfully."
