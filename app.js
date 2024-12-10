document.getElementById('lookupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const values = document.getElementById('values').value.split('\n').map(v => v.trim()).filter(v => v);
    console.log('Input values:', values);

    const file = document.getElementById('csvFile').files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            console.log('CSV Data:', csvData);

            const rows = csvData.split('\n').map(row => row.split(','));
            console.log('Parsed Rows:', rows);

            const headers = rows[0];
            const resultRows = [headers];

            rows.slice(1).forEach(row => {
                if (values.includes(row[0])) {
                    resultRows.push(row);
                }
            });

            console.log('Result Rows:', resultRows);

            const resultCsv = resultRows.map(row => row.join(',')).join('\n');
            downloadResult(resultCsv);
        };
        reader.readAsText(file);
    }
});

function downloadResult(csv) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = 'result.csv';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Download Result';
}
