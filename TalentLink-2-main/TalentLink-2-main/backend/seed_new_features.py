"""
Seed script to add sample data for new features
"""

from app import app, db
from models import (
    User, Contract, Project, Proposal, 
    SavedProject, TimeEntry, Dispute, SkillEndorsement, 
    Invoice, ProjectTemplate
)
from datetime import datetime, date, timedelta
import json

def seed_data():
    """Add sample data for testing new features"""
    with app.app_context():
        print("Seeding sample data for new features...")
        
        # Get existing users
        client = User.query.filter_by(email='client@demo.com').first()
        freelancer = User.query.filter_by(email='freelancer@demo.com').first()
        
        if not client or not freelancer:
            print("❌ Demo users not found. Please run the app first to create them.")
            return
        
        # Create a sample project and contract if they don't exist
        project = Project.query.filter_by(client_id=client.id).first()
        if not project:
            project = Project(
                client_id=client.id,
                title='Build E-commerce Website',
                description='Need a full-stack developer to build an e-commerce platform',
                budget=5000.0,
                duration='2 months',
                skills_required=json.dumps(['React', 'Node.js', 'MongoDB']),
                status='in_progress'
            )
            db.session.add(project)
            db.session.commit()
            print("✅ Created sample project")
        
        # Create proposal and contract
        proposal = Proposal.query.filter_by(project_id=project.id, freelancer_id=freelancer.id).first()
        if not proposal:
            proposal = Proposal(
                project_id=project.id,
                freelancer_id=freelancer.id,
                cover_letter='I can build this for you',
                proposed_amount=5000.0,
                delivery_time='2 months',
                status='accepted'
            )
            db.session.add(proposal)
            db.session.commit()
            print("✅ Created sample proposal")
        
        contract = Contract.query.filter_by(project_id=project.id).first()
        if not contract:
            contract = Contract(
                project_id=project.id,
                proposal_id=proposal.id,
                freelancer_id=freelancer.id,
                amount=5000.0,
                status='active'
            )
            db.session.add(contract)
            db.session.commit()
            print("✅ Created sample contract")
        
        # 1. Seed Project Templates
        if ProjectTemplate.query.count() == 0:
            templates = [
                ProjectTemplate(
                    user_id=client.id,
                    name='E-commerce Website Template',
                    description='Complete setup for online store with payment integration',
                    category='web_dev',
                    budget_range='$3,000 - $10,000',
                    duration_range='4-8 weeks',
                    skills_required=json.dumps(['React', 'Node.js', 'MongoDB', 'Stripe']),
                    milestones=json.dumps([
                        {'name': 'Design', 'description': 'UI/UX design'},
                        {'name': 'Development', 'description': 'Core functionality'},
                        {'name': 'Testing', 'description': 'QA and testing'},
                        {'name': 'Deployment', 'description': 'Launch'}
                    ]),
                    is_public=True
                ),
                ProjectTemplate(
                    user_id=client.id,
                    name='Mobile App Template',
                    description='iOS and Android app development',
                    category='mobile_app',
                    budget_range='$5,000 - $15,000',
                    duration_range='6-12 weeks',
                    skills_required=json.dumps(['React Native', 'Firebase', 'iOS', 'Android']),
                    is_public=True
                ),
                ProjectTemplate(
                    user_id=client.id,
                    name='Logo Design Template',
                    description='Professional logo and brand identity',
                    category='design',
                    budget_range='$500 - $2,000',
                    duration_range='1-2 weeks',
                    skills_required=json.dumps(['Adobe Illustrator', 'Photoshop', 'Branding']),
                    is_public=True
                )
            ]
            for template in templates:
                db.session.add(template)
            db.session.commit()
            print(f"✅ Created {len(templates)} project templates")
        
        # 2. Seed Time Entries
        if TimeEntry.query.count() == 0:
            time_entries = [
                TimeEntry(
                    contract_id=contract.id,
                    freelancer_id=freelancer.id,
                    description='Frontend development - Homepage',
                    hours=8.0,
                    date=date.today() - timedelta(days=2),
                    is_billable=True
                ),
                TimeEntry(
                    contract_id=contract.id,
                    freelancer_id=freelancer.id,
                    description='Backend API development',
                    hours=6.5,
                    date=date.today() - timedelta(days=1),
                    is_billable=True
                ),
                TimeEntry(
                    contract_id=contract.id,
                    freelancer_id=freelancer.id,
                    description='Database setup and configuration',
                    hours=4.0,
                    date=date.today(),
                    is_billable=True
                )
            ]
            for entry in time_entries:
                db.session.add(entry)
            db.session.commit()
            print(f"✅ Created {len(time_entries)} time entries")
        
        # 3. Seed Invoices
        if Invoice.query.count() == 0:
            invoices = [
                Invoice(
                    contract_id=contract.id,
                    invoice_number=f'INV-{datetime.utcnow().year}-1001',
                    amount=2000.0,
                    tax_amount=200.0,
                    total_amount=2200.0,
                    status='sent',
                    due_date=date.today() + timedelta(days=15),
                    notes='First milestone payment'
                ),
                Invoice(
                    contract_id=contract.id,
                    invoice_number=f'INV-{datetime.utcnow().year}-1002',
                    amount=1500.0,
                    tax_amount=150.0,
                    total_amount=1650.0,
                    status='draft',
                    due_date=date.today() + timedelta(days=30),
                    notes='Second milestone payment'
                )
            ]
            for invoice in invoices:
                db.session.add(invoice)
            db.session.commit()
            print(f"✅ Created {len(invoices)} invoices")
        
        # 4. Seed Saved Projects (for freelancer)
        if SavedProject.query.count() == 0:
            # Create another project to save
            project2 = Project(
                client_id=client.id,
                title='Mobile App Development',
                description='Looking for Flutter developer',
                budget=3000.0,
                duration='1 month',
                skills_required=json.dumps(['Flutter', 'Firebase']),
                status='open'
            )
            db.session.add(project2)
            db.session.commit()
            
            saved = SavedProject(
                user_id=freelancer.id,
                project_id=project2.id
            )
            db.session.add(saved)
            db.session.commit()
            print("✅ Created saved project")
        
        # 5. Seed Skill Endorsements
        if SkillEndorsement.query.count() == 0:
            # Create another freelancer for endorsements
            freelancer2 = User.query.filter_by(email='freelancer2@demo.com').first()
            if not freelancer2:
                from werkzeug.security import generate_password_hash
                freelancer2 = User(
                    email='freelancer2@demo.com',
                    password_hash=generate_password_hash('password123'),
                    role='freelancer',
                    name='Jane Developer'
                )
                db.session.add(freelancer2)
                db.session.commit()
            
            endorsements = [
                SkillEndorsement(
                    endorser_id=freelancer2.id,
                    endorsee_id=freelancer.id,
                    skill='React'
                ),
                SkillEndorsement(
                    endorser_id=freelancer2.id,
                    endorsee_id=freelancer.id,
                    skill='Node.js'
                ),
                SkillEndorsement(
                    endorser_id=client.id,
                    endorsee_id=freelancer.id,
                    skill='Python'
                )
            ]
            for endorsement in endorsements:
                db.session.add(endorsement)
            db.session.commit()
            print(f"✅ Created {len(endorsements)} skill endorsements")
        
        print("\n🎉 Sample data seeded successfully!")
        print("\nYou can now:")
        print("- View invoices at /invoices")
        print("- View time tracking at /contracts/{contract_id}/time-tracking")
        print("- View saved projects at /saved-projects")
        print("- View templates at /templates")
        print("- Create disputes at /disputes")
        print("- View analytics at /analytics")

if __name__ == '__main__':
    seed_data()
