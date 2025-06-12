document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('timestamp').value = new Date().toISOString();

    document.querySelectorAll('.info-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.getElementById(link.dataset.modal).showModal();
        });
    });
    document.querySelectorAll('dialog .close').forEach(btn =>
        btn.addEventListener('click', e => {
            btn.closest('dialog').close();
        })
    );
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleDateString();

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('outFirst')) {
        const params = new URLSearchParams(window.location.search);
        const map = {
            outFirst: 'firstName',
            outLast: 'lastName',
            outEmail: 'email',
            outPhone: 'phone',
            outBiz: 'organization',
            outStamp: 'timestamp'
        };
        Object.entries(map).forEach(([spanId, param]) => {
            document.getElementById(spanId).textContent =
                params.get(param) || '—';
        });
    }
});