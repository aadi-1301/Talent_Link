"""Add new features: saved projects, time tracking, disputes, endorsements, invoices, templates

Revision ID: add_new_features
Revises: 56960ac31691
Create Date: 2025-12-03

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_new_features'
down_revision = '56960ac31691'
branch_labels = None
depends_on = None


def upgrade():
    # Create saved_project table
    op.create_table('saved_project',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('project_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create time_entry table
    op.create_table('time_entry',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('contract_id', sa.Integer(), nullable=False),
        sa.Column('freelancer_id', sa.Integer(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('hours', sa.Float(), nullable=False),
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('is_billable', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['contract_id'], ['contract.id'], ),
        sa.ForeignKeyConstraint(['freelancer_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create dispute table
    op.create_table('dispute',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('contract_id', sa.Integer(), nullable=False),
        sa.Column('raised_by', sa.Integer(), nullable=False),
        sa.Column('reason', sa.Text(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=True),
        sa.Column('resolution', sa.Text(), nullable=True),
        sa.Column('resolved_at', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['contract_id'], ['contract.id'], ),
        sa.ForeignKeyConstraint(['raised_by'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create skill_endorsement table
    op.create_table('skill_endorsement',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('endorser_id', sa.Integer(), nullable=False),
        sa.Column('endorsee_id', sa.Integer(), nullable=False),
        sa.Column('skill', sa.String(length=100), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['endorsee_id'], ['user.id'], ),
        sa.ForeignKeyConstraint(['endorser_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create invoice table
    op.create_table('invoice',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('contract_id', sa.Integer(), nullable=False),
        sa.Column('invoice_number', sa.String(length=50), nullable=False),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('tax_amount', sa.Float(), nullable=True),
        sa.Column('total_amount', sa.Float(), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=True),
        sa.Column('due_date', sa.Date(), nullable=False),
        sa.Column('paid_date', sa.Date(), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['contract_id'], ['contract.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('invoice_number')
    )

    # Create project_template table
    op.create_table('project_template',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=200), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('category', sa.String(length=50), nullable=True),
        sa.Column('budget_range', sa.String(length=50), nullable=True),
        sa.Column('duration_range', sa.String(length=50), nullable=True),
        sa.Column('skills_required', sa.Text(), nullable=True),
        sa.Column('milestones', sa.Text(), nullable=True),
        sa.Column('is_public', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('project_template')
    op.drop_table('invoice')
    op.drop_table('skill_endorsement')
    op.drop_table('dispute')
    op.drop_table('time_entry')
    op.drop_table('saved_project')
