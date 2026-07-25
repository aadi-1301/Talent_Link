"""Seed script to add demo messages"""
from app import app, db
from models import User, Message
from datetime import datetime, timedelta

with app.app_context():
    # Get demo users
    client = User.query.filter_by(email='client@demo.com').first()
    freelancer = User.query.filter_by(email='freelancer@demo.com').first()
    
    if not client or not freelancer:
        print("Demo users not found. Please run the app first to create them.")
        exit(1)
    
    # Clear existing messages
    Message.query.delete()
    
    # Create demo messages
    messages = [
        Message(
            sender_id=client.id,
            receiver_id=freelancer.id,
            content="Hi! I saw your profile and I'm interested in hiring you for my project.",
            message_type='text',
            is_temporary=False,
            created_at=datetime.utcnow() - timedelta(hours=2)
        ),
        Message(
            sender_id=freelancer.id,
            receiver_id=client.id,
            content="Hello! Thank you for reaching out. I'd be happy to discuss your project. What are you looking to build?",
            message_type='text',
            is_temporary=False,
            created_at=datetime.utcnow() - timedelta(hours=1, minutes=55)
        ),
        Message(
            sender_id=client.id,
            receiver_id=freelancer.id,
            content="I need a full-stack web application for managing freelance projects. It should have user authentication, project management, and messaging features.",
            message_type='text',
            is_temporary=False,
            created_at=datetime.utcnow() - timedelta(hours=1, minutes=50)
        ),
        Message(
            sender_id=freelancer.id,
            receiver_id=client.id,
            content="That sounds like an interesting project! I have experience building similar applications. When would you like to start?",
            message_type='text',
            is_temporary=False,
            created_at=datetime.utcnow() - timedelta(hours=1, minutes=45)
        ),
        Message(
            sender_id=client.id,
            receiver_id=freelancer.id,
            content="As soon as possible. What's your availability?",
            message_type='text',
            is_temporary=False,
            created_at=datetime.utcnow() - timedelta(minutes=30)
        ),
    ]
    
    for msg in messages:
        db.session.add(msg)
    
    db.session.commit()
    print(f"Successfully created {len(messages)} demo messages!")
    print(f"Client ID: {client.id}, Freelancer ID: {freelancer.id}")
