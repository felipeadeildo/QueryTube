from prisma.models import Source

Source.create_partial("SourceOut", exclude=["id", "metadata"])

Source.create_partial("SourceIn", include=["id", "metadata", "status", "createdAt"])