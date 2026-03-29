# 🚀 FLOWCHAT: Flowchat Landing Page

> El primer sistema multiagente de IA para WhatsApp que convierte conversaciones en acción.

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Deployment](#deployment)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Documentation](#api-documentation)

---

## 💻 Requisitos

- Python 3.9+
- PostgreSQL 14+ (para producción)
- Docker & Docker Compose (opcional)
- Git
- Sistema operativo: Linux, macOS o Windows (WSL recomendado)

---

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/flowchat.git
cd flowchat
```

### 2. Crear entorno virtual

```bash
# En Windows
python -m venv .venv
.venv\Scripts\activate

# En macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Instalar dependencias

```bash
# Desarrollo
pip install -r requirements-dev.txt

# Producción
pip install -r requirements.txt
```

### 4. Configurar variables de entorno

```bash
cp .env.example .env
# Edita .env con tus valores
```

---

## ⚙️ Configuración

### Opciones de ambiente

El proyecto soporta tres ambientes:

1. **development** (Desarrollo local)
2. **production** (GCP)
3. **testing** (Tests)

#### Seleccionar ambiente

```bash
# Desarrollo (default)
export DJANGO_ENV=development

# Producción
export DJANGO_ENV=production

# Testing
export DJANGO_ENV=testing
```

### Variables de entorno críticas

```bash
# Seguridad
SECRET_KEY=tu-clave-secreta-muy-segura
DEBUG=False

# Base de datos
DATABASE_URL=postgresql://user:password@localhost/st_whatsapp

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=tu-email@gmail.com
EMAIL_HOST_PASSWORD=tu-app-password
```

---

## 🚀 Ejecución

### Local (SQLite + Django Dev Server)

```bash
python manage.py migrate
python manage.py runserver
```

Accede a http://localhost:8000

### Con Docker Compose

```bash
docker-compose up -d
```

Bases de datos y servicios:
- **Web**: http://localhost:8000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

---

## 📦 Deployment

### En Google Cloud Platform

#### 1. Requisitos previos

```bash
# Instalar Google Cloud CLI
# https://cloud.google.com/sdk/docs/install

# Autenticar
gcloud auth login
gcloud config set project tu-proyecto-id
```

#### 2. Configurar secrets en GitHub

En tu repositorio (Settings > Secrets):

```
GCP_PROJECT_ID = tu-proyecto-id
GCP_SA_KEY = (contenido del JSON de service account)
```

#### 3. Deploy automático

Simplemente haz un push a `main`:

```bash
git add .
git commit -m "feat: nuevo feature"
git push origin main
```

GitHub Actions automáticamente:
- ✅ Ejecuta tests
- 📦 Builds Docker image
- 🚀 Deploya a App Engine

---

## 📁 Estructura del Proyecto

```
flowchat/
├── config/                    # Configuración centralizada
│   ├── settings/
│   │   ├── base.py           # Base de todas las configs
│   │   ├── development.py    # Desarrollo
│   │   └── production.py     # Producción
│   ├── urls.py               # URLs principales
│   └── wsgi.py
│
├── apps/                      # Apps Django modulares
│   ├── landing/              # Landing page actual
│   ├── blog/                 # Blog (futuro)
│   └── users/                # Usuarios (futuro)
│
├── static/                    # Assets estáticos
│   └── landing/
│       ├── css/
│       ├── js/
│       └── images/
│
├── templates/                 # Templates globales
│   ├── base.html
│   └── includes/
│       ├── navbar.html
│       └── footer.html
│
├── tests/                     # Suite de tests
├── .github/workflows/         # CI/CD
├── .env.example              # Ejemplo de variables
├── docker-compose.yml        # Docker Compose
├── Dockerfile               # Docker build
├── app.yaml                 # GCP App Engine config
└── requirements.txt         # Dependencias
```

---

## 🧪 Tests

Ejecutar la suite completa:

```bash
pytest
```

Con coverage:

```bash
pytest --cov=apps --cov-report=html
```

Coverage report en `htmlcov/index.html`

---

## 📝 Comandos útiles

```bash
# Crear migraciones
python manage.py makemigrations

# Ejecutar migraciones
python manage.py migrate

# Crear superuser (admin)
python manage.py createsuperuser

# Recolectar archivos estáticos
python manage.py collectstatic --noinput

# Shell interactivo
python manage.py shell

# Ejecutar comando en producción
gcloud app services deploy ...
```

---

## 🔐 Seguridad

- ✅ CSRF Protection habilitado
- ✅ CORS configurado
- ✅ XSS Prevention
- ✅ Security headers
- ✅ SQL Injection prevention (ORM)
- ✅ SSL/TLS en producción

### Checklist de seguridad

Antes de producción:

```bash
python manage.py check --deploy
```

---

## 🐛 Troubleshooting

### "ModuleNotFoundError: No module named 'config'"

```bash
# Ensure PYTHONPATH includes project root
export PYTHONPATH="${PYTHONPATH}:/path/to/flowchat"
```

### "Database connection refused"

```bash
# Verifica que PostgreSQL esté corriendo
psql -U postgres -h localhost
```

### "Static files not serving"

```bash
# En development
python manage.py collectstatic

# Verifica STATIC_ROOT en settings
```

---

## 📚 Recursos

- [Django Documentation](https://docs.djangoproject.com)
- [Google Cloud Platform](https://cloud.google.com)
- [Docker Documentation](https://docs.docker.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## 📞 Contacto

- Email: edgemant@conauti.com
- WhatsApp: +51 997975161
- Website: https://conauti.com

---

**Made with ❤️ by Conauti Team**
# st-channel-botwhatsapp
