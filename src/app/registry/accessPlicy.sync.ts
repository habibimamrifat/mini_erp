import { PermissionModel } from "../modules/permissions/permissin.model";
import { getRegisteredPolicies } from "./accessPolicyREgistry";


export const syncPermissions = async () => {
  console.log("Syncing Permissions...");

  const policies = getRegisteredPolicies();

  for (const policy of policies) {
    for (
      let i = 0;
      i < policy.requiredPermissionAccess.length;
      i++
    ) {
      const permissionCode =
        policy.requiredPermissionAccess[i];

      const module =
        policy.requiredModuleAccess[i];

      await PermissionModel.updateOne(
        {
          code: permissionCode,
        },
        {
          $set: {
            code: permissionCode,
            module,
            name: policy.name,
            isDeleted: false,
          },
        },
        {
          upsert: true,
        }
      );

      console.log(`✔ Synced Permission: ${permissionCode}`);
    }
  }

  console.log("Permissions Synced");
};