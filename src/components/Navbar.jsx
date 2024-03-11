import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div class="container-fluid">
                <p class="navbar-brand">OneDev Converter</p>
                <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit" disabled>Search</button>
                </form>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
