from flask import Flask, render_template, request, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail, Message
from config import Config

db = SQLAlchemy()
migrate = Migrate()
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    # Rutas
    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/about")
    def about():
        return render_template("about.html")

    @app.route("/projects")
    def projects():
        return render_template("projects.html")

    @app.route("/contact", methods=["GET", "POST"])
    def contact():
        if request.method == "POST":
            nombre = request.form.get("name")
            email = request.form.get("email")
            message = request.form.get("message")

            if nombre and email and message:
                msg = Message(
                    subject=f"Contacto desde Portafolio - {nombre}",
                    sender=app.config['MAIL_DEFAULT_SENDER'],
                    recipients=[app.config['MAIL_USERNAME']],  # tu correo real
                    reply_to=email,   # correo del usuario que llena el formulario
                    charset="utf-8"
                )
                msg.body = f"Nombre: {nombre}\nCorreo: {email}\nMensaje:\n{message}"
                mail.send(msg)
                flash("Mensaje enviado correctamente ✅", "success")
                return redirect(url_for("contact"))
            else:
                flash("Por favor completa todos los campos", "danger")

        return render_template("contact.html")

    return app

# ✅ Aquí agregamos la línea que faltaba
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
