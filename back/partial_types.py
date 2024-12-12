from prisma.models import Source

Source.create_partial("SourceOut", exclude=["id", "metadata"])

Source.create_partial("SourceIn", exclude=["id", "metadata", "status", "createdAt"])
