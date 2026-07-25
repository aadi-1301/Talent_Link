"""
Script to create all database tables for new features
Run this to ensure all tables exist
"""

from app import app, db
from models import (
    User, Profile, Project, Proposal, Contract, Message, Review, Notification,
    ProjectMilestone, MilestoneUpdate, Payment, SavedProject, TimeEntry,
    Dispute, SkillEndorsement, Invoice, ProjectTemplate
)

def create_all_tables():
    """Create all database tables"""
    with app.app_context():
        print("Creating all database tables...")
        
        # Create all tables
        db.create_all()
        
        print("✅ All tables created successfully!")
        print("\nTables created:")
        print("- User")
        print("- Profile")
        print("- Project")
        print("- Proposal")
        print("- Contract")
        print("- Message")
        print("- Review")
        print("- Notification")
        print("- ProjectMilestone")
        print("- MilestoneUpdate")
        print("- Payment")
        print("- SavedProject")
        print("- TimeEntry")
        print("- Dispute")
        print("- SkillEndorsement")
        print("- Invoice")
        print("- ProjectTemplate")
        
        # Verify tables exist
        inspector = db.inspect(db.engine)
        tables = inspector.get_table_names()
        print(f"\n✅ Total tables in database: {len(tables)}")
        print(f"Tables: {', '.join(tables)}")

if __name__ == '__main__':
    create_all_tables()
