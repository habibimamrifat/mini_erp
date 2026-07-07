export interface IRoutePolicy {
  key: string;
  name: string;
  description?: string;

  requiredModuleAccess: string[];
  requiredPermissionAccess: string[];
}

const registry = new Map<string, IRoutePolicy>();

export const registerPolicy = (
  policy: IRoutePolicy
) => {
  registry.set(policy.key, policy);
};

export const getRegisteredPolicies = () => {
  return Array.from(registry.values());
};