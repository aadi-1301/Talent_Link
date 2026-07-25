"""add message features

Revision ID: add_message_features
Revises: 56960ac31691
Create Date: 2025-12-03 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_message_features'
down_revision = '56960ac31691'
branch_labels = None
depends_on = None


def upgrade():
    # Add new columns to message table
    op.add_column('message', sa.Column('message_type', sa.String(length=20), nullable=True))
    op.add_column('message', sa.Column('image_url', sa.String(length=500), nullable=True))
    op.add_column('message', sa.Column('is_temporary', sa.Boolean(), nullable=True))
    
    # Set default values for existing records
    op.execute("UPDATE message SET message_type = 'text' WHERE message_type IS NULL")
    op.execute("UPDATE message SET is_temporary = 0 WHERE is_temporary IS NULL")
    
    # Make message_type and is_temporary non-nullable after setting defaults
    op.alter_column('message', 'message_type', nullable=False, server_default='text')
    op.alter_column('message', 'is_temporary', nullable=False, server_default='0')


def downgrade():
    op.drop_column('message', 'is_temporary')
    op.drop_column('message', 'image_url')
    op.drop_column('message', 'message_type')
