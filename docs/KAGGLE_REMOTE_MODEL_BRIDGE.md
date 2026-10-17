# GeoNexa: Kaggle notebook link + remote LLM bridge

## Linked research resource
- Kaggle owner/notebook: `mabrigkorie/geonexa`
- Notebook: https://www.kaggle.com/code/mabrigkorie/geonexa
- Provided run: https://www.kaggle.com/code/mabrigkorie/geonexa/edit/run/359001056
- GeoNexa page: `/kaggle`
- Owner-only inference API: `POST /api/geomind/ask`

**Current state:** Notebook/run links are included in the website. We have **not** verified the notebook's files, architecture, run success, model, checkpoints, or attached datasets. They are not streamed into the app. No inference from Kaggle is live merely because a run URL is linked.

## Why not directly send chat requests to a Kaggle notebook?
Kaggle notebooks run in managed sessions and expose notebook execution, output, and status via supported APIs; a notebook URL is not an always-on public HTTPS text-generation endpoint. Do not point the GeoNexa chat API at a Kaggle editor URL or expose Kaggle API credentials to visitors.

## Cloud-to-cloud connection (no PC download)
1. Inspect the Kaggle notebook in its owner account: identify actual model checkpoint, model architecture, dataset names/licences, and whether the run completed successfully. Confirm that sharing/hosting is allowed.
2. If the notebook is a training/evaluation job, keep it on Kaggle. Publish the model to a supported hosted inference service using that service's model import/registry process. The transfer can take place from cloud to cloud; nothing needs to be downloaded to a PC.
3. Create a private HTTPS, OpenAI-compatible **chat completions** endpoint with the hosted model; verify its API, compute/latency limit and accepted model name. Kaggle GPU notebook execution alone is not such an endpoint.
4. In Vercel → GeoNexa project → Settings → Environment Variables, add **server-only** values:

```dotenv
GEONEXA_REMOTE_INFERENCE_ENABLED=false
GEONEXA_INFERENCE_ENDPOINT_URL=https://router.huggingface.co/v1/chat/completions
GEONEXA_INFERENCE_API_KEY=
GEONEXA_INFERENCE_MODEL=
GEONEXA_INFERENCE_OWNER_TOKEN=
```

   - Set `GEONEXA_INFERENCE_OWNER_TOKEN` to a randomly generated secret of at least 32 characters; never publish or embed it in browser JavaScript.
   - For dedicated Hugging Face inference endpoints, replace the URL with the provider's actual HTTPS OpenAI-compatible `/chat/completions` endpoint. Confirm the selected endpoint serves the target Kaggle-trained model; using an unrelated model does not integrate the Kaggle model.
   - The allowlist limits requests to `router.huggingface.co` and `*.endpoints.huggingface.cloud`. Model routing and costs depend on your provider plan.
   - Initially leave `GEONEXA_REMOTE_INFERENCE_ENABLED=false` until the endpoint, provider budget, and access controls are verified.
5. For a private owner test, after enabling the flag and redeploying, call the backend (not from public client code):

```bash
curl -X POST https://geo-nexa-africa.vercel.app/api/geomind/ask \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $GEONEXA_INFERENCE_OWNER_TOKEN" \
  -d '{"question":"Explain the limitations of electrical resistivity for groundwater screening."}'
```

The API validates input size, checks a private owner token, limits output, uses a timeout, and refuses to issue calls until explicitly configured. Do not turn this into a public visitor chat without **server-side accounts, shared/persistent rate limiting, per-user quotas, cost caps, consent, logging without sensitive content, and abuse tests**.

## Dataset connection
A linked notebook is **not** proof that its datasets were imported or made searchable. To use an external Kaggle dataset as retrieval context, identify the exact dataset URL/license, choose approved public subsets, and implement a server-side retrieval/indexing service with provenance and access control. Keep the original source reference; don't upload restricted datasets into a public vector index. External retrieval is not yet implemented.

## Verification and acceptance
- /kaggle displays correct source links and candid connection status.
- /geomind links to /kaggle and keeps existing supervised workflows.
- Disabled inference returns HTTP 503 without provider calls.
- Missing/wrong owner auth returns HTTP 401, without disclosing server API keys.
- Invalid body returns HTTP 400. Provider failures return controlled 502.
- Public users cannot invoke paid inference.
- Confirm which model is actually served before calling it "Kaggle-trained".
