import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UserActivityMetrics = ({ users }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
        User Activity
      </h3>
      <div className="space-y-3">
        {users?.map((user) => (
          <div key={user?.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {user?.avatar ? (
                <Image
                  src={user?.avatar}
                  alt={user?.avatarAlt}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-caption font-medium text-foreground truncate">
                  {user?.name}
                </div>
                <div className="text-xs text-muted-foreground">{user?.role}</div>
              </div>
            </div>
            <span className="text-sm font-heading font-semibold text-foreground data-text ml-2">
              {user?.actions}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivityMetrics;