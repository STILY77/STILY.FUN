async function f() {
        return await fetch('./messages.txt')
        .then(res => res.text())
        .then(sites => {
          sites = sites.split(/\r|\n/)
          const linkers = document.querySelectorAll('a')[0]
          linkers.addEventListener('click', (e) => {
            var i = parseInt(Math.random() * sites.length)
            location.href = sites[i]
          })
        })
      }
      
      f()