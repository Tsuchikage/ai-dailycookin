# About

An App for processing product content that solves the tasks of improving the quality of product photos (removing photo infographics, applying a specific background to photos).


## Run

### Ensure `.env`
```bash
cp .env.example .env
```
Add proper `OPENAI_API_KEY` and `GOOGLE_VISION_API_KEY` envs to `.env`

### Build
```bash
make build
```

### Run
```bash
make run
```

### Dev build and run
```bash
make dev_up
```


Web page can be found at `0.0.0.0`

Backend swagger docs: `0.0.0.0/api/docs`

## Web Demo

[46.174.52.127](http://46.174.52.127/)
