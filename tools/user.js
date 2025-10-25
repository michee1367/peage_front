const ADMIN_ROLE="ROLE_ADMIN"
const AGENT_ROLE="ROLE_AGENT"
const RECEPTIONNIST_ROLE="ROLE_RECEPTIONIST"

export function is_admin(user) {
    return user.user.roles.find(role => role == ADMIN_ROLE)
}

export function is_receptionnist(user) {
    return user.user.roles.find(role => role == RECEPTIONNIST_ROLE)    
}
export function is_agent(user) {
    return user.user.roles.find(role => role == AGENT_ROLE)        
}

export function is_visitor(user) {
    return user.user.roles.find(role => role != ADMIN_ROLE && role != RECEPTIONNIST_ROLE && role != AGENT_ROLE)  
    
}