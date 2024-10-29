import { ITodoProvider } from './ITodoProvider';
import { ApiProvider } from './ApiProvider';
import { LocalStorageProvider } from './LocalStorageProvider';

export function getTodoProvider(providerType: string): ITodoProvider {
    if (providerType === 'api') {
        return new ApiProvider();
    } else if (providerType === 'local') {
        return new LocalStorageProvider();
    } else {
        throw new Error('Invalid provider type');
    }
}
