from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/api/articles")
def articles():
    return jsonify([
        {"id": 1, "title": "Article 1", "content": "Content of Article 1"},
        {"id": 2, "title": "Article 2", "content": "Content of Article 2"}
    ])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
