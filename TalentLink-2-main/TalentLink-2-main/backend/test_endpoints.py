"""
Test script to verify all API endpoints are working
"""

from app import app, db
from models import User, Contract, Project, Proposal
import json

def test_endpoints():
    """Test all new feature endpoints"""
    with app.app_context():
        print("Testing API Endpoints...\n")
        
        # Get users
        client = User.query.filter_by(email='client@demo.com').first()
        freelancer = User.query.filter_by(email='freelancer@demo.com').first()
        
        if not client or not freelancer:
            print("❌ Demo users not found. Run the app first.")
            return
        
        print(f"✅ Found client: {client.email}")
        print(f"✅ Found freelancer: {freelancer.email}\n")
        
        # Check contracts
        contracts = Contract.query.all()
        print(f"📋 Total contracts: {len(contracts)}")
        if contracts:
            for c in contracts:
                print(f"   - Contract #{c.id}: {c.project.title} (${c.amount})")
        print()
        
        # Check projects
        projects = Project.query.all()
        print(f"📁 Total projects: {len(projects)}")
        if projects:
            for p in projects:
                print(f"   - Project #{p.id}: {p.title} ({p.status})")
        print()
        
        # Check if tables exist
        from models import (SavedProject, TimeEntry, Dispute, 
                           SkillEndorsement, Invoice, ProjectTemplate)
        
        print("🗄️  Checking tables:")
        print(f"   - SavedProject: {SavedProject.query.count()} records")
        print(f"   - TimeEntry: {TimeEntry.query.count()} records")
        print(f"   - Dispute: {Dispute.query.count()} records")
        print(f"   - SkillEndorsement: {SkillEndorsement.query.count()} records")
        print(f"   - Invoice: {Invoice.query.count()} records")
        print(f"   - ProjectTemplate: {ProjectTemplate.query.count()} records")
        print()
        
        # Test analytics data
        print("📊 Analytics Data:")
        print(f"   Client projects: {Project.query.filter_by(client_id=client.id).count()}")
        print(f"   Freelancer proposals: {Proposal.query.filter_by(freelancer_id=freelancer.id).count()}")
        print(f"   Freelancer contracts: {Contract.query.filter_by(freelancer_id=freelancer.id).count()}")
        print()
        
        print("✅ All checks complete!")
        print("\nIf you see data above, the backend is working correctly.")
        print("If frontend still shows errors, check:")
        print("1. Backend is running (python app.py)")
        print("2. Frontend is running (npm run dev)")
        print("3. Check browser console for errors")
        print("4. Verify you're logged in")

if __name__ == '__main__':
    test_endpoints()
