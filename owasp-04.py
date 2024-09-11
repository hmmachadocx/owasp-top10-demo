from flask import Flask, request, send_file
import os

app = Flask(__name__)

# === CWE-73: External Control of File Name or Path ===
@app.route('/download', methods=['GET'])
def download_file():
    # Retrieve the filename from the user's input
    filename = request.args.get('filename')
    
    # Construct the file path based on user input without proper validation
    file_path = os.path.join('uploads', filename)
    
    # Vulnerable: No validation of the file path, allowing path traversal
    if os.path.exists(file_path):
        return send_file(file_path)
    else:
        return 'File not found', 404

if __name__ == '__main__':
    app.run(debug=True)
