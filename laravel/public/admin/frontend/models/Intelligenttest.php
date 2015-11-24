<?php

namespace app\models;

use Yii;

/**
 * This is the model class for collection "company".
 *
 * @property \MongoId|string $_id
 * @property mixed $name
 */
class Intelligenttest extends \yii\mongodb\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function collectionName()
    {
        return ['niuke', 'intelligenttest'];
    }
    
    /**
     * @inheritdoc
     */
    public function attributes()
    {
        return [
            '_id',
            'title',
            'pid',
            'leave',
        ];
    }
}
