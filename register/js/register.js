let participantCount = 1;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const addBtn = document.getElementById('add');
  const summary = document.getElementById('summary');

  addBtn.addEventListener('click', () => {
    participantCount++;
    const html = participantTemplate(participantCount);
    addBtn.insertAdjacentHTML('beforebegin', html);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('adult_name').value;
    const total = totalFees();
    const message = successTemplate({ name, count: participantCount, total });
    form.style.display = 'none';
    summary.innerHTML = message;
    summary.classList.remove('hide');
  });
});

function participantTemplate(count) {
  return `
  <section class="participant${count}">
    <p>Participant ${count}</p>
    <div class="item">
      <label for="fname${count}"> First Name<span>*</span></label>
      <input id="fname${count}" type="text" name="fname${count}" required />
    </div>
    <div class="item activities">
      <label for="activity${count}">Activity #<span>*</span></label>
      <input id="activity${count}" type="text" name="activity${count}" />
    </div>
    <div class="item">
      <label for="fee${count}">Fee ($)<span>*</span></label>
      <input id="fee${count}" type="number" name="fee${count}" />
    </div>
    <div class="item">
      <label for="date${count}">Desired Date <span>*</span></label>
      <input id="date${count}" type="date" name="date${count}" />
    </div>
    <div class="item">
      <p>Grade</p>
      <select>
        <option value="" disabled selected></option>
        ${[...Array(12)].map((_, i) => `<option value="${i+1}">${i+1}th</option>`).join('')}
      </select>
    </div>
  </section>`;
}

function totalFees() {
  let feeElements = [...document.querySelectorAll("[id^=fee]")];
  return feeElements.reduce((sum, el) => sum + parseFloat(el.value || 0), 0);
}

function successTemplate({ name, count, total }) {
  return `<h2>Thank you ${name} for registering.</h2>
  <p>You have registered ${count} participant${count > 1 ? 's' : ''} and owe $${total.toFixed(2)} in fees.</p>`;
}
