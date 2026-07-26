# MongoDB Collections

> Schemas de las colecciones disponibles en cada base de datos de cliente LinkaForm

## Convención de nombres de BD

```
infosync_answers_client_<id>
# ejemplo: infosync_answers_client_<client_id>
```

- MongoDB versión: **6.0.26**
- El `<id>` es el ID numérico del cliente en la plataforma

## Colecciones disponibles

| Colección | Propósito |
|---|---|
| `form_answer` | Respuestas activas — colección principal (`self.cr`) |
| `form_answer_archived` | Respuestas archivadas |
| `answer_version` | Historial de versiones de respuestas |
| `CronModel` | Modelos de tareas cron |
| `CronTask` | Ejecuciones de tareas cron |
| `download_history` | Historial de descargas |
| `filters` | Filtros guardados |
| `grading` | Calificaciones |
| `LKFModules` | Módulos instalados en la cuenta |
| `Oracle` | Configuración Oracle / integraciones |
| `script_log` | Log de ejecución de scripts |
| `voucher` | Vouchers / comprobantes |
| `web_service` | Configuración de web services |
| `workflow_data` | Configuración de workflows por formulario |
| `workflow_log` | Log de ejecuciones de workflows |

---

## schema: `script_log`

Dos estados posibles según si el proceso terminó o no.

**En ejecución** (`status: 'running'`):
```json
{
  "_id": "ObjectId",
  "status": "running",
  "user_id": "<user_id>",
  "traceback": "Logs en proceso",
  "is_public": false,
  "script_id": "<script_id>",
  "start_date": "ISODate"
}
```

**Finalizado** (`status: 'done'`):
```json
{
  "_id": "ObjectId",
  "start_date": "ISODate",
  "end_date": "ISODate",
  "script_id": "<script_id>",
  "is_public": false,
  "status": "done",
  "error_mail_sent": false,
  "user_id": "<user_id>",
  "run_in_wf": true,
  "traceback": "https://f001.backblazeb2.com/file/app-linkaform/public-client-<client_id>/scripts/logs/<nombre>_<timestamp>.log",
  "duration": 5,
  "run_success": true
}
```

Notas:
- `traceback`: literal `"Logs en proceso"` mientras corre; URL a Backblaze B2 al terminar
- `run_success`, `end_date`, `duration`, `error_mail_sent`, `run_in_wf` — solo presentes al terminar
- `run_in_wf: true` indica ejecución desde un workflow (vs. manual o cron)
- `duration`: segundos de ejecución
- Esta colección **no usa soft-delete** — no tiene `deleted_at`

---

## schema: `workflow_log`

Un documento por ejecución de regla de workflow sobre un registro:

```json
{
  "_id": "ObjectId",
  "created_at": "ISODate",
  "email_responses": [],
  "folio": "1-<client_id>",
  "form_id": "<form_id>",
  "name": "nombre del workflow",
  "record_id": "ObjectId",
  "record_request_id": "ObjectId",
  "record_request_content": "<JSON string — payload del registro disparador con answers completos>",
  "record_response_content": "<JSON string — respuesta del registro>",
  "record_response_code": 201,
  "record_success": true,
  "record_status": "created",
  "synched": false,
  "user_id": -1,
  "workflow_rule_id": "ObjectId",
  "workflow_rule": 9,
  "workflow_rule_name": "Form to catalog: descripción de la regla",
  "workflow_request_content": "<JSON string — payload enviado al destino>",
  "workflow_response_content": "<JSON string — respuesta del destino>",
  "workflow_sucess": true,
  "workflow_catalog_id": "<catalog_form_id>",
  "catalog_answer_id": "<ObjectId string del registro en el catálogo destino>"
}
```

Notas:
- `workflow_sucess` (sic): typo en el campo — una sola `c`, así está en la BD
- `record_request_content` y `workflow_request_content`: son **JSON strings**, no objetos — requieren `json.loads()` para accederlos
- `user_id: -1` indica ejecución automática del sistema (no un usuario humano)
- `synched`: indica si el registro ya fue procesado por algún proceso posterior
- Esta colección **no usa soft-delete**

---

## schema: `workflow_data`

Un documento por `form_id` con todos sus workflows configurados:

```json
{
  "_id": "ObjectId",
  "form_id": "<form_id>",
  "workflows": [
    {
      "id": "ObjectId",
      "name": "nombre del workflow",
      "actions": [
        {
          "_id": "ObjectId",
          "action_id": 12,
          "action_settings": {},
          "configuration": {
            "synched_catalogs": [{ }]
          }
        }
      ],
      "rules": {
        "metadata": {
          "connection": [],
          "date": {
            "range": { "start": "ISODate string", "end": "ISODate string", "selected": false },
            "period": { "month": 1, "year": 2014, "selected": false }
          },
          "user": [],
          "grading": {}
        },
        "record": {
          "created": true,
          "deleted": true,
          "edited": true,
          "run_multiple_times": true,
          "runtime": "after"
        },
        "wf_fields": {
          "operator": "all",
          "triggers": []
        }
      }
    }
  ]
}
```

Notas:
- Un documento por `form_id` — contiene **todos** los workflows del formulario en el array `workflows`
- `rules.record`: define qué eventos disparan el WF y cuándo (`runtime: 'after'` | `'before'`)
- `rules.wf_fields.triggers`: condiciones de campo que deben cumplirse para disparar; vacío = siempre
- `action_id` conocidos hasta ahora:
  - `12` → sincronizar a catálogo (`configuration.synched_catalogs`)
- Esta colección **no usa soft-delete**
