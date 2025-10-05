# from django.test import TestCase
import bcrypt
# password = "testpass"
# stored_hash = "$12$.6lBB7L6df9ell4StgMKXe7PZj1fQle5xiU1LTu59LBiybYKFcs1."
# matches = bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8'))
# print(matches)

# Generate a Bcrypt Hash
import bcrypt
password = "newpass"
hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
print(hashed)
#$2b$12$ShXfY8VKiUNGQRdDUQBzie0i7FIXBxVSXJfSovPdcx9hQUL7z.A72