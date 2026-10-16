# GeoNexa — Kaggle research to hosted GeoMind LLM (no local downloads)

## Source
- Notebook: https://www.kaggle.com/code/mabrigkorie/geonexa
- User-supplied run: https://www.kaggle.com/code/mabrigkorie/geonexa/edit/run/359001056
- The notebook and its outputs could not be inspected through the public endpoint; **do not claim** an LLM, dataset, checkpoint, tokenizer or inference API exists until verified in Kaggle.

## What "add, not download" means
Keep the model and research datasets in cloud infrastructure. The website sends authorized text requests to a dedicated inference API over HTTPS; the browser and Git repository do not receive model weights or bulk datasets.

Kaggle notebook runs are batch/interactive execution jobs. The Kaggle CLI supports status, input/output artifact listing and retrieving run files; this **is not** a stable production chat endpoint. Simply pasting a notebook's editor/run link into the app does not allow live inference.

Some transfer **between cloud services** is normally needed: if you trained a model on Kaggle, publish authorized checkpoint + tokenizer files to a model registry / hosting service from the Kaggle runtime itself. This does not require downloading them onto a user's computer. Respect licensing, Kaggle terms, and any dataset privacy constraints.

## Publish the actual LLM from the Kaggle session
1. Open run 359001056 in Kaggle and inspect the run logs/Output and notebook code.
2. Check whether the notebook actually produces an LLM checkpoint, tokenizer, config, and supported inference format. If no checkpoint exists, choose a hosted foundation model; do not label it "Kaggle-trained".
3. If checkpoint exists and rights allow, push it **from Kaggle** directly to a private Hugging Face Hub model repository using a Kaggle Secret containing a narrowly scoped Hugging Face write token. Do not print or commit tokens. Upload only explicitly approved files.
4. In Hugging Face, deploy that repository using a compatible hosted Inference Endpoint, or use Hugging Face's routed Inference Providers if you only need an existing remote LLM. For a custom checkpoint, verify deployment engine supports the model and GPU budget.
5. Copy the provider's HTTPS OpenAI-compatible chat-completions URL, its supported model ID, and a server-side API token. Never expose that provider token in browser JavaScript.
6. In Vercel > geo-nexa-africa > Settings > Environment Variables (Preview first), configure:
   - GEONEXA_INFERENCE_ENDPOINT_URL = cloud provider's **exact** HTTPS /v1/chat/completions endpoint
   - GEONEXA_INFERENCE_API_KEY = hosted model inference API key
   - GEONEXA_INFERENCE_MODEL = provider's supported model ID
   - GEONEXA_INFERENCE_OWNER_TOKEN = 32+ character randomly generated owner token, different from provider key
   - GEONEXA_REMOTE_INFERENCE_ENABLED = true
   Leave ENABLE_PUBLIC_AI = false. Never set any of these as NEXT_PUBLIC_*.
7. Redeploy Preview, visit /geomind, type the private owner test token only into the owner-only test form, and ask a harmless geological theory question.
8. Compare the output to the model/provider inference logs and test wrong token, malformed question, timeout, empty provider response, and disabled configuration.

**Only Hugging Face router and `*.endpoints.huggingface.cloud` hosts are accepted by the bridge.** It is disabled by default. Do not enable general public access to this private test endpoint.

## Data sources (separate from model serving)
Linking the notebook is research provenance, not a data search/index service. For private or large Kaggle research datasets:
- Leave source files in their permitted cloud home or approved object store.
- Build an access-controlled indexing/preprocessing job near the dataset to produce a small, cited index or API, not a browser upload of full files.
- Perform retrieval server-side and pass only relevant, licensed snippets to the model. Enforce project access rules, provenance, retention policies, and prompt-injection controls.
- Preserve geologic map/source metadata (date, geographic extent, source institution, uncertainty). Never use unsourced LLM output as evidence of groundwater/mineral location.

## Limits and security
- POST /api/geomind/ask is owner-only, disabled by default, refuses missing/short tokens, and limits prompt size, output tokens and upstream request time.
- Provider secrets remain on Vercel's server, not in the app bundle. Owner token is held only in browser component memory while the page is open, not written to localStorage.
- This is not a production public AI chat service. Before public launch, add identity-based auth, durable rate limits, spend quotas, abuse monitoring, auditing, privacy consent, and prompt-injection testing.
- The endpoint does not invoke Kaggle or verify that a chosen hosted model was trained in Kaggle. It uses whatever model was independently deployed and configured.

## Reference documentation
- Kaggle CLI notebook operations: https://github.com/Kaggle/kaggle-cli/blob/main/docs/kernels.md
- Hugging Face serving: https://huggingface.co/docs/huggingface_hub/main/guides/inference
- Hugging Face Inference Providers: https://huggingface.co/docs/inference-providers/index
