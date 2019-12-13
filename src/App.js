import React from 'react';
import rest from 'rest';

class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {employees: [], departments : []};
    }

    componentDidMount() {
        rest('/employees').then(response => {
            this.setState({employees: JSON.parse(response.entity)._embedded.employeeList})});
        rest('/departments').then(response => {
            this.setState({departments: JSON.parse(response.entity)._embedded.departmentList})});
    }

    render(){
        const employeeContainer =
            <div className="container">
                <h2>Employee Grid</h2>
                <EmployeeList employees={this.state.employees}/>
            </div>;
        const departmentContainer =
            <div className="container">
                <h2>Department Grid</h2>
                <DepartmentList departments={this.state.departments}/>
            </div>;
        return (
            <div className="container">
                {employeeContainer}
                {departmentContainer}
            </div>
        )
    }
}

class EmployeeList extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const employees = this.props.employees.map(employee =>
            <Employee key={employee._links.self.href} employee={employee}/>
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col border">Id</div>
                    <div className="col border">First Name</div>
                    <div className="col border">Last Name</div>
                    <div className="col border">Email</div>
                    <div className="col border">Phone Number</div>
                    <div className="col border">Hire Date</div>
                    <div className="col border">Salary</div>
                    <div className="col border">Manager Id</div>
                    <div className="col border">Department Id</div>
                </div>
                {employees}
            </div>
        )
    }
}

class Employee extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="row">
                <div className="col border">{this.props.employee.id}</div>
                <div className="col border">{this.props.employee.firstName}</div>
                <div className="col border">{this.props.employee.lastName}</div>
                <div className="col border">{this.props.employee.email}</div>
                <div className="col border">{this.props.employee.phoneNumber}</div>
                <div className="col border">{this.props.employee.hireDate}</div>
                <div className="col border">{this.props.employee.salary}</div>
                <div className="col border">{this.props.employee.managerId}</div>
                <div className="col border">{this.props.employee.departmentId}</div>
            </div>
        )
    }

}

class DepartmentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const departments = this.props.departments.map(department =>
            <Department key={department._links.self.href} department={department}/>
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col border">Id</div>
                    <div className="col border">Name</div>
                    <div className="col border">Manager Id</div>
                </div>
                {departments}
            </div>
        )
    }
}

class Department extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="row">
                <div className="col border">{this.props.department.id}</div>
                <div className="col border">{this.props.department.name}</div>
                <div className="col border">{this.props.department.managerId}</div>
            </div>
        )
    }

}

export default App;
