from flask import Blueprint, render_template, request, redirect, url_for, flash
from app import db
from models.usuario import Usuario
from werkzeug.security import generate_password_hash, check_password_hash

usuarios_bp = Blueprint("usuarios", __name__, url_prefix="/usuarios")

@usuarios_bp.route("/")
def lista_usuarios():
    users = Usuario.query.all()
    return render_template("usuarios.html", users=users)

@usuarios_bp.route("/register", methods=["GET", "POST"])
def register():
    error = None
    if request.method == "POST":
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        password = request.form.get("password")

        if Usuario.query.filter_by(email=email).first():
            error = "El correo ya está registrado."
        else:
            hashed_password = generate_password_hash(password)
            nuevo = Usuario(nombre=nombre, email=email, password=hashed_password)
            db.session.add(nuevo)
            db.session.commit()
            flash("Usuario registrado correctamente", "success")
            return redirect(url_for("usuarios.lista_usuarios"))

    return render_template("register.html", error=error)
