from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    age_group = request.form.get('age_group')
    files = request.files.getlist('files')
    uploaded_files = []

    for file in files:
        if file:
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filepath)
            uploaded_files.append(file.filename)

    return jsonify({
        'name': name,
        'age_group': age_group,
        'files': uploaded_files
    })

if __name__ == '__main__':
    app.run(debug=True)
