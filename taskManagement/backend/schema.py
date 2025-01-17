import graphene
from graphene_django.types import DjangoObjectType
from .models import Task, User

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email", "tasks")

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ("id", "title", "description", "completed", "due_date", "user")


class Signup(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, username, password, email):
        if User.objects.filter(username=username).exists():
            return Signup(success=False, message="Username already exists")
        
        user = User.objects.create_user(username=username, email=email, password=password)
        return Signup(success=True, message="User created successfully")

class Query(graphene.ObjectType):
    tasks = graphene.List(TaskType)
    task = graphene.Field(TaskType, id=graphene.UUID(required=True))

    def resolve_tasks(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication required!")
        return Task.objects.filter(user=user)

    def resolve_task(self, info, id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication required!")
        return Task.objects.get(pk=id, user=user)

class CreateTask(graphene.Mutation):
    task = graphene.Field(TaskType)

    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()
        completed = graphene.Boolean()
        due_date = graphene.DateTime()

    def mutate(self, info, title, description=None, completed=False, due_date=None):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication required!")
        task = Task.objects.create(
            title=title, description=description, completed=completed, due_date=due_date, user=user
        )
        return CreateTask(task=task)

class UpdateTask(graphene.Mutation):
    task = graphene.Field(TaskType)

    class Arguments:
        id = graphene.UUID(required=True)
        title = graphene.String()
        description = graphene.String()
        completed = graphene.Boolean()
        due_date = graphene.DateTime()

    def mutate(self, info, id, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication required!")
        task = Task.objects.get(pk=id, user=user)
        for key, value in kwargs.items():
            setattr(task, key, value)
        task.save()
        return UpdateTask(task=task)

class DeleteTask(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.UUID(required=True)

    def mutate(self, info, id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Authentication required!")
        task = Task.objects.get(pk=id, user=user)
        task.delete()
        return DeleteTask(ok=True)

class Mutation(graphene.ObjectType):
    signup = Signup.Field()
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()