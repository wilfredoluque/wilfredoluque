import os

class Config:
    # Seguridad
    SECRET_KEY = os.environ.get('SECRET_KEY', 'supersecretkey')
    
    # Base de datos (aunque aún no la uses)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///wilainova.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask-Mail (contacto)
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'luquemaytawilfredo@gmail.com'      # tu correo sin ñ ni acentos
    MAIL_PASSWORD = 'mhgq gsbm eubg djih'  # App Password de Gmail
    MAIL_DEFAULT_SENDER = 'noreply@tudominio.com'       # remitente fijo
