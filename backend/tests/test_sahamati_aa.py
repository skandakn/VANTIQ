import pytest
from backend.integrations.sahamati_aa_client import SahamatiAAClient


def test_sahamati_aa_protocol():
    client = SahamatiAAClient()
    consent = client.create_consent_request(
        customer_vpa="9876543210@onemoney",
        date_from="2026-01-01",
        date_to="2026-03-31",
    )
    assert consent.consent_handle.startswith("HANDLE-")

    status = client.check_consent_status(consent.consent_handle)
    assert status["status"] == "ACTIVE"

    sess_id = client.request_fi_data(status["consent_id"])
    assert sess_id.startswith("SESSION-FI-")

    fi_res = client.fetch_fi_data(sess_id)
    assert fi_res.is_decrypted is True
    assert len(fi_res.accounts_payload) > 0
