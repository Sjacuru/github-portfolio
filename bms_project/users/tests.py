import bcrypt
# Generate bcrypt hash
password = "newpass"
hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
print(hashed)
