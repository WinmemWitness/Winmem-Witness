use serde::{Deserialize, Serialize};

#[derive(Clone)]
pub struct WinmemClient {
    base_url: String,
    api_key: Option<String>,
    http: reqwest::Client,
}

impl WinmemClient {
    pub fn new(base_url: impl Into<String>, api_key: Option<String>) -> Self {
        Self {
            base_url: base_url.into(),
            api_key,
            http: reqwest::Client::new(),
        }
    }

    fn url(&self, path: &str) -> String {
        format!("{}{}", self.base_url.trim_end_matches('/'), path)
    }

    pub async fn whoami(&self) -> Result<WhoAmI, reqwest::Error> {
        let mut req = self.http.get(self.url("/v1/auth/whoami"));
        if let Some(k) = &self.api_key {
            req = req.header("x-winmem-api-key", k);
        }
        req.send().await?.json::<WhoAmI>().await
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WhoAmI {
    pub role: String,
    pub tenantId: String,
}
