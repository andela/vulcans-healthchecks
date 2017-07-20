from django.contrib.auth.models import User
from django.core import mail
from django.test import TestCase
from hc.api.models import Check


class LoginTestCase(TestCase):
    def SetUp(self):
        pass


    def test_it_sends_link(self):
        check = Check()
        check.save()

        session = self.client.session
        session["welcome_code"] = str(check.code)
        session.save()

        form = {"email": "alice@example.org"}

        r = self.client.post("/accounts/login/", form)
        assert r.status_code == 302

        ### Assert that a user was created
        user = User.objects.get(email="alice@example.org")
        self.assertEqual(user.email, "alice@example.org")

        # And email sent
        self.assertEqual(len(mail.outbox), 1)

        # Assert contents of the email body
        self.assertEqual(mail.outbox[0].subject, 'Log in to healthchecks.io')

        ### Assert that check is associated with the new user
        self.assertIn('To log in', mail.outbox[0].body)

    def test_it_pops_bad_link_from_session(self):
        self.client.session["bad_link"] = True
        self.client.get("/accounts/login/")
        assert "bad_link" not in self.client.session

        ### Any other tests?
    def test_login_using_password(self):
        self.alice = User(username="alice", email="alice@example.org")
        self.alice.set_password("password")
        self.alice.save()
        form = {"email": "alice@example.org", "password": "password"}
        r = self.client.post("/accounts/login/", form)
        self.assertRedirects(r, "/checks/")