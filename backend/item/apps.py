from django.apps import AppConfig


class ItemConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'item'

    def ready(self) -> None:
        import item.signals
