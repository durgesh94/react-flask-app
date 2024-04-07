from flask import Flask
from flask_restful import Api
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import os
from datetime import timedelta
from flask_cors import CORS

from src.config.db import initialize_db
from src.resources.user_resource import SignupResource, SigninResource, UserResource
from src.resources.blogpost_resource import BlogPostResource, UserBlogPostResource

# Loading environment variables
load_dotenv()

# Declaring flask application
app = Flask(__name__)
api = Api(app)
jwt = JWTManager(app)
CORS(app)  # Initialize CORS with your Flask app

# Set JWT secret key from environment variable
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

# Set the expiration time for access tokens (e.g., 1 hour)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize the database connection
initialize_db(app)

# Add resources to API
api.add_resource(BlogPostResource, '/api/blogpost', '/api/blogpost/<string:post_id>')
api.add_resource(UserBlogPostResource, '/api/user/<string:user_id>/blogpost')
api.add_resource(SigninResource, '/api/user/signin')
api.add_resource(SignupResource, '/api/user/signup')
api.add_resource(UserResource, '/api/user')

if __name__ == '__main__':
    app.run(debug=True)
