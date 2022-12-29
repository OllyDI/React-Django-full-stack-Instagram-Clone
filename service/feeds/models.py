from django.db import models


class FeedImage(models.Model):
    feed = models.ForeignKey(
        'feeds.Feed',
        related_name = 'feed_images',
        on_delete = models.CASCADE
    )
    image = models.ImageField(
        null = True,
        upload_to = 'feeds/%Y/%/%m/%d'
    )

# Create your models here.
class FeedManager(models.Manager):
    pass


# db : feeds__feed
class Feed(models.Model):
    user = models.ForeignKey(
        'users.User',
        related_name='user_feeds',
        on_delete = models.PROTECT
    )

    description = models.CharField(max_length = 512, blank=True)
    link = models.IntegerField(default = 0)
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now = True)

    # objects - 기본으로 제공하는 매니저
    # feeds - 위에서 생성한 사용자 매니저
    objects = models.Manager()
    feeds = models.FeedManager()

    class Meta:
        ordering = ['-created']

