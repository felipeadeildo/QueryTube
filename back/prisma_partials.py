from prisma.models import Source

Source.create_partial("SourceOut", exclude=["id", "metadata"])
